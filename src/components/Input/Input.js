import PropTypes from 'prop-types'

import styles from "./Input.module.scss"
import clsx from 'clsx'

const Input = ({ type = "text", name, title, children, defaultValue = "", placeholder = "", onChange, required=false, customClass }) => {

    const handleChange = e => {
        if (type === "file") {
            if (e?.target?.files) {
                onChange(e.target.files)
            }
        } else {
            onChange(e.target.value)
        }
    }

    return <div className={clsx(styles.inputContainer, customClass)}>
        <label className={styles.textInputLabel}>
            {title}
            {required && <span className={styles.required}>*</span>}
        </label>
        {type === "file" ? <input name={name} type={type} placeholder={placeholder} onChange={handleChange} className={styles.fileInput}>
            {children}
        </input>
            :
            <input name={name} type={type} value={defaultValue} placeholder={placeholder} onChange={handleChange} className={styles.input}>
                {children}
            </input>
        }
    </div>
}

Input.propTypes = {
    customClass: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
}

export default Input
