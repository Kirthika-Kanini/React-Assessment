import React from 'react';
import styles from './Columns.css';

const Columns = () => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h2>Column 1</h2>
        <p>This is the content for column 1.</p>
      </div>
      <div className={styles.column}>
        <h2>Column 2</h2>
        <p>This is the content for column 2.</p>
      </div>
      <div className={styles.column}>
        <h2>Column 3</h2>
        <p>This is the content for column 3.</p>
      </div>
      <div className={styles.column}>
        <h2>Column 4</h2>
        <p>This is the content for column 4.</p>
      </div>
    </div>
  );
};

export default Columns;
