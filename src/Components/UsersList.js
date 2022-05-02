import React from "react";
import styles from "./UsersList.module.css";
const UsersList = (props) => {
  return (
    props.users.length !== 0 && (
      <div className={styles.users_container}>
        {props.users.slice(0, 10).map((item) => {
          return (
            <div className={styles.user} key={item.id}>
              <a
                className={styles.userName}
                href={item.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {item.login}
              </a>
              <div className={styles.img_wrapper}>
                <img
                  className={styles.user_image}
                  src={item.avatar_url}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default React.memo(UsersList);
