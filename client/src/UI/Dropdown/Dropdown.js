import {useState, useEffect, useRef} from 'react'
import {BiChevronDown, BiChevronUp} from 'react-icons/bi'
import './Dropdown.css'

const Dropdown = ({save, defaultPlaceHolder, list, selection}) => {
    const dropdownRef = useRef(null)
    const [value, setValue] = useState(defaultPlaceHolder)
    const [open, setOpen] = useState(false)

    const handleClick = (value) => {
        setValue(value)
        save(value)
        setOpen(false)
    }

    useEffect(() => {
        const closeDropdownOnOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
    
        document.addEventListener('click', closeDropdownOnOutsideClick);
    
        return () => {
            document.removeEventListener('click', closeDropdownOnOutsideClick);
        };
    }, []);


    return (
        <div className='dropdown' ref={dropdownRef}>
            <div onClick={()=>setOpen(!open)} className='optionBlock'>
                <span 
                        className={
                        (value === defaultPlaceHolder && selection === '') ? "option default" 
                        : (value !== defaultPlaceHolder && selection === '') ? 'option default' 
                        : selection !== '' ? 'option' : "option"
                    }
                >
                        {
                            selection === '' ? defaultPlaceHolder 
                            : selection!== '' ? selection : value
                        }
                </span>
                {open ? <BiChevronUp color={'rgba(140, 157, 177, 1)'} size={30}/>: <BiChevronDown color='rgba(140, 157, 177, 1)' size={30}/> }
            </div>
            {open && 
                <ul className="menu">
                {
                    list.map((value, index)=>{
                    return (
                                <li key={index} onClick={()=>handleClick(value)} className="item">{value}</li>
                            )
                        }
                    )
                }
                </ul>
            }
        </div>
    )
}

export default Dropdown