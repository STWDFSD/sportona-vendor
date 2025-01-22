const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const STRIPE_PRIVATE_KEY_LIVE =
  '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';
const stripe = require('stripe')(STRIPE_PRIVATE_KEY_LIVE);
admin.initializeApp();

const db = admin.firestore();

exports.sendOtp = functions.https.onCall(async (data, context) => {
  const { email } = data;

  if (!email) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Email is required'
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const otpDoc = {
    otp,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt: admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + 5 * 60 * 1000)
    ),
  };

  await db.collection('otps').doc(email).set(otpDoc);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hamdullahdir98@gmail.com',
      pass: 'bsvd veoo wxsz jtns',
    },
  });

  const mailOptions = {
    from: 'hamdullahdir98@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. This code is valid for 5 minutes.`,
    html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>This code is valid for 5 minutes.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
});

exports.verifyOtp = functions.https.onCall(async (data, context) => {
  const { email, otp } = data;

  if (!email || !otp) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Email and OTP are required'
    );
  }

  const otpDoc = await db.collection('otps').doc(email).get();

  if (!otpDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'OTP not found');
  }

  const { otp: storedOtp, expiresAt } = otpDoc.data();

  console.log('Stored OTP:', storedOtp, typeof storedOtp);
  console.log('Received OTP:', otp, typeof otp);

  if (expiresAt.toDate() < new Date()) {
    throw new functions.https.HttpsError(
      'deadline-exceeded',
      'OTP has expired'
    );
  }

  if (String(storedOtp) !== String(otp)) {
    throw new functions.https.HttpsError('unauthenticated', 'Invalid OTP');
  }

  await db.collection('otps').doc(email).delete();

  return { success: true, message: 'OTP verified successfully!' };
});

exports.resetPasswordWithOtp = functions.https.onCall(async (data, context) => {
  const { email, newPassword } = data;

  if (!email || !newPassword) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Email and new password are required.'
    );
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(user.uid, { password: newPassword });

    return { success: true, message: 'Password reset successfully.' };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Failed to reset password.'
    );
  }
});

exports.getSubscriptionsDetails = functions.https.onCall(
  async (data, context) => {
    const { subscriptionIds } = data;
    if (!Array.isArray(subscriptionIds) || subscriptionIds.length === 0) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'An array of subscription IDs is required.'
      );
    }

    try {
      const subscriptionDetails = await Promise.all(
        subscriptionIds.map(async id => {
          try {
            return await stripe.subscriptions.retrieve(id);
          } catch (err) {
            console.error(`Error fetching subscription ${id}:`, err.message);
            return { id, error: 'Failed to fetch subscription details.' };
          }
        })
      );

      return { subscriptions: subscriptionDetails };
    } catch (error) {
      console.error('Error fetching subscriptions:', error.message);
      throw new functions.https.HttpsError(
        'internal',
        'Unable to fetch subscriptions. Please try again later.'
      );
    }
  }
);
