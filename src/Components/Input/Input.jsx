import React from 'react'

import './Input.css'

function Input({ required, textarea, label, children, full, inpValue, setInpValue }) {
    return (
        <div className={`input ${textarea ? 'textarea' : ''}`} style={{ width: full ? '100%' : '49% ' }}>
            <span className="input__title">
                {label}
                {
                    required &&
                    <span className='input__icon'>
                        *
                    </span>
                }
            </span>
            {
                textarea
                    ? <textarea className='input__field' placeholder={children} onChange={e => setInpValue(e.target.value)} value={inpValue}></textarea>
                    : <input type="text" className='input__field' placeholder={children} value={inpValue} onChange={e => setInpValue(e.target.value)} />
            }
        </div>
    )
}
export default Input;