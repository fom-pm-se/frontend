export const REQUIRED = (value: string) => {
  if (value) return true;
  return 'Dieses Feld ist erforderlich';
};

export const MINLENGTH = (min: number, value: string) => {
  return value.length >= min || 'Mindestens ' + min + ' Zeichen';
}

export const MAXLENGTH = (max: number, value: string) => {
  return value.length <= max || 'Maximal ' + max + ' Zeichen';
}

export const EMAIL = (value: string) => {
  const regExp = /.+@.+\..+/;
  return regExp.test(value) || 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
}

export const PASSWORD = (value: string) => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regExp.test(value) || 'Mindestens 8 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben eine Zahl';
}

export const PASSWORD_CONFIRM = (value: string, password: string) => {
  return value === password || 'Passwörter stimmen nicht überein';
}
