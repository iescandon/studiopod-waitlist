import { TextField } from "@mui/material";

interface NameInputProps {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  isValidName: boolean,
  setIsValidName: React.Dispatch<React.SetStateAction<boolean>>,
};

export function NameInput({ name, setName, isValidName, setIsValidName }: NameInputProps) {
  const handleValidate = (newValue: { target: { value: string; }; }) => {
    const trimmedValue = newValue.target.value.trim()
    const isValid = trimmedValue === "" && trimmedValue.length < 1 ? false : true;
    setIsValidName(isValid);
  }

  const handleChange = (newValue: { target: { value: string; }; }) => {
    setName(newValue.target.value)
  }

  return (
    <TextField
    sx={{
      width: "300px",
      "& .MuiInputBase-root": {
        background: "white"
      },
      "& .MuiFilledInput-root": {
        background: "white"
      }
    }}
    name="name"
    placeholder="Enter Full Name"
    required
    value={name}
    onChange={handleChange}
    onBlur={handleValidate}
    error={!isValidName}
    helperText={!isValidName && "Name is a required field"}
   />
  )
}