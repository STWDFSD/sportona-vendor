export const AuthErrorMessages = errorCode => {
  switch (errorCode) {
    case 'auth/captcha-expired':
      return 'Captcha Expired! Please Refresh!';

    case 'auth/user-not-found':
      return 'User not found';

    case 'auth/operation-not-allowed':
      return 'Operation not allowed';

    case 'auth/invalid-display-name':
      return 'Invalid display name';

    case 'camp/camp-error':
      return 'Error in creating/duplicating campaign';

    case 'template/template-error':
      return 'Error in creating Template. Try Again!';
    case 'auth/invalid-password':
      return 'Invalid password';

    case 'auth/wrong-password':
      return 'Wrong password';

    case 'auth/invalid-email':
      return 'Invalid email';

    case 'auth/invalid-credential':
      return 'Invalid credential';

    case 'auth/internal-error':
      return 'Internal error';

    case 'auth/email-already-exists':
      return 'Email already exists';

    case 'auth/email-already-in-use':
      return 'Email already in use';

    case 'auth/invalid-code':
      return 'Invalid Code';

    case 'auth/passwords-not-matched':
      return 'Password not matched';

    case 'auth/phone-number-already-exists':
      return 'Phone number is already in use';

    case 'auth/invalid-verification-code':
      return 'Invalid code';

    case 'auth/code-expired':
      return 'Code Expired';

    case 'auth/too-many-requests':
      return 'Too many requests';

    case 'client/creation-error':
      return 'Error creating client';
    case 'deal/creation-error':
      return 'Error creating/updating deal';
    case 'appointment/creation-error':
      return 'Error creating an appointment';
    case 'client/unable-to-send-email':
      return 'Unable to send email';

    default:
      return 'Unknown Error';
  }
};

export const ToastInfoMessages = infoCode => {
  switch (infoCode) {
    case 'phone/code-resend-successfully':
      return 'Code resend successfully';

    case 'email/code-resend-successfully':
      return 'Invite resend successfully';

    default:
      return 'Unknown Error';
  }
};
