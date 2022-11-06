import React from 'react'

type Props = {
    value?: string | number
    placeholder?: string
    label?: string
    onTextChange?: (text: string) => void
    disabled?: boolean
    type?: 'text' | 'email' | 'number'
    maxLength?: number
    autocomplete?: string
}

function TextInput(props: Props) {
    const {value, placeholder, disabled, type, onTextChange, label, maxLength, autocomplete} = props

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onTextChange) {
            return
        }

        onTextChange(e.currentTarget.value.substring(0, maxLength))
    }

    return (
        <div className='flex flex-row items-center text-right w-full justify-end'>
            <label className='md:w-80 pr-4'>{label}</label>
            <input
                className='text-black p-1 w-full'
                type={type || 'text'}
                readOnly={disabled}
                onChange={onChangeText}
                value={value}
                placeholder={placeholder}
                maxLength={maxLength}
                autoComplete={autocomplete}
            />
        </div>
    )
}

export default TextInput
