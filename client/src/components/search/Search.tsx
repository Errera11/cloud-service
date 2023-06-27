import React, {useMemo, useState} from 'react';
import styles from './Search.module.scss'

interface IProps {
    onSearch: (str: string) => void
}
let timeoutId: null | ReturnType<typeof setTimeout> = null;
const Search: React.FC<IProps> = ({onSearch}) => {
    const [search, setSearch] = useState('')
    useMemo(() => {
        if(timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout((searchPar) => onSearch(searchPar), 1500, search)
    }, [search])
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    return (
        <div className={styles.container}>
            <input className={styles.input} value={search} onChange={(e) => onChangeHandler(e)} placeholder={'Search...'}/>
        </div>
    );
};

export default Search;