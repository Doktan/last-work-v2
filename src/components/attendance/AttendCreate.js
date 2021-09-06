import React, {useContext} from 'react';

const AttendCreate = (props) => {
    return(
        <div>
            Добавить запись
            <form>
                <select>
                    <option value='-1'>Выберите работника</option>
                    {props.data.map(staff=>{
                        return(
                            <option value={staff.id_worker}>{staff.name}</option>
                        );
                    })}
                </select>
                <select>
                    <option value='-1'>Выберите статус</option>
                    <option value='0'>Вышел</option>
                    <option value='1'>Вошел</option>
                </select>
                <input type="text" placeholder='Дата и время'></input>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default AttendCreate;
