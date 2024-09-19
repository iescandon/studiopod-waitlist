import {
  matchIsValidTel,
  MuiTelInput,
} from 'mui-tel-input'

interface PhoneInputProps {
  phone: string,
  setPhone: React.Dispatch<React.SetStateAction<string>>,
  isValidPhone: boolean,
  setIsValidPhone: React.Dispatch<React.SetStateAction<boolean>>,
};

export function PhoneInput({ phone, setPhone, isValidPhone, setIsValidPhone }: PhoneInputProps) {
  const handleValidate = (newValue: { target: { value: string; }; }) => {
    const isValid = matchIsValidTel(newValue.target.value, {
      onlyCountries: ['US'],
    })
    setIsValidPhone(isValid);
  }

  const handleChange = (newValue: string) => {
    setPhone(newValue)
  }

  return (
    <MuiTelInput
    sx={{
      width: "300px",
      "& .MuiInputBase-root": {
        background: "white"
      },
      "& .MuiFilledInput-root": {
        background: "white"
      }
    }}
    name="phone"
    required
    value={phone}
    onChange={handleChange}
    onBlur={handleValidate}
    error={!isValidPhone}
    helperText={!isValidPhone && "Phone is a required field"}
    defaultCountry="US"
    disableDropdown
  />
  )
}