import React from 'react'

type Option = {
    text: string
    value: number
}
type Props = {
    id: string
    value: string
    label?: string
    onTextChange?: (text: string) => void
    options: Option[]
}

function SelectInput(props: Props) {
    const {value, onTextChange, label, id, options} = props

    const onChangeText = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!onTextChange) {
            return
        }

        onTextChange(e.currentTarget.value)
    }

    return (
        <div className="relative w-full flex flex-row items-center text-right">
            <label className='w-80 pr-4' htmlFor={'frm' + id}>{label}</label>
            <select
                className="appearance-none w-full py-1 px-2 bg-white shadow-lg text-gray-800 w-3/5 md:w-full"
                id={'frm' + id}
                onChange={onChangeText}
                value={parseInt(value)}
            >
                {options.map((o) => {
                    return <option key={id + o.value} value={o.value}>{o.text}</option>
                })}
            </select>
            <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    )
}

export default SelectInput
