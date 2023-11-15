import { Stack, TextField } from '@mui/material';

interface Props {
  size?: number;
  className?: string;
  value?: string;
  editable: boolean;
  validationPattern?: RegExp;
  onChange: (val: string) => void;
}

export default function OtpInputCompoent({
  size = 6,
  value = '',
  editable,
  validationPattern = /[0-9]{1}/,
  className,
  onChange,
}: Props) {
  const arr = new Array(size).fill('-');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const elem = e.target;
    const val = e.target.value;
    // check if the value is valid
    if (!validationPattern.test(val) && val !== '') return;

    // change the value of the upper state using onChange
    const valueArr = value.split('');
    valueArr[index] = val;
    const newVal = valueArr.join('').slice(0, 6);
    onChange(newVal);

    // focus the next element if there's a value
    if (val) {
      const next = elem.nextElementSibling;
      // @ts-ignore
      next?.focus();
    }
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = e.currentTarget;
    if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
      const prev = current.previousElementSibling;
      // @ts-ignore
      prev?.focus();
      // @ts-ignore
      prev?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === 'ArrowRight') {
      const prev = current.nextSibling;
      // @ts-ignore
      prev?.focus();
      // @ts-ignore
      prev?.setSelectionRange(0, 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.clipboardData.getData('text').substring(0, size);
    onChange(val);
  };

  return (
    <Stack
      sx={{
        gap: 4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {arr.map((_, index) => (
        <TextField
          key={index}
          onPaste={handlePaste}
          className={className}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
          onKeyUp={handleKeyUp}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          inputProps={{
            pattern: validationPattern.source,
          }}
          sx={{ '& input': { textAlign: 'center' } }}
          disabled={!editable}
          value={value.at(index) ?? ''}
        />
      ))}
    </Stack>
  );
}
