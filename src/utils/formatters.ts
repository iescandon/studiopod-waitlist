
export function getFirstName(fullName: string) {
    return fullName.split(' ')[0];
  }
  
  export function getFirstNameAndLastInitial(fullName: string) {
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastInitial = nameParts.length > 1 ? nameParts[1][0] : '';
    
    return `${firstName} ${lastInitial ? lastInitial + '.' : ''}`;
  }
  
  export function formatPhoneNumber(phoneNumber: string) {
      const cleanNumber = phoneNumber.slice(1);
      const formattedNumber = cleanNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      return formattedNumber;
  }