import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  text: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ text }) => {
  return (
    <label className={styles.container}>
      {text}
      <input type="checkbox" />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkbox;
