/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent } from 'react';
import clsx from 'clsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QUILL_FORMATS, QUILL_MODULES } from '@/constant/quill';
import { Label } from './ui/label';

interface ICustomTextEditorProps {
  onChange?: ((e: ChangeEvent<HTMLInputElement> | any) => void) | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  classes?: string | any;
  label?: string;
  error?: string;
}

function CustomTextEditor(props: ICustomTextEditorProps) {
  return (
    <div>
      {props.label && (
        <Label
          children={props.label}
        />
      )}
      <ReactQuill
        className={clsx(props.classes)}
        theme="snow"
        formats={QUILL_FORMATS}
        modules={QUILL_MODULES}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={(value) => props.onChange && props.onChange(value)}

      />
      {props.error && <Label children={props.error} />}
    </div>
  );
}

export default CustomTextEditor;
