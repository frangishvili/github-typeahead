import React, { useState, useEffect, useMemo, useRef, Fragment } from "react";
import UsersList from "./UsersList";
import styles from "./Typeahead.module.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function Typeahead() {
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const getUsers = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${input}in:login/,`,
        {
          method: "get",
          headers: new Headers({
            // this personal access token works locally, but when I push it to the github
            //  public repository the token  automatically revokes and my rate limit is 10 request per minute.
            // Authorization: "token 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",
          }),
        }
      );
      const result = await response.json();
      const filteredUsers = await result.items.filter((item) => {
        return item.login.slice(0, input.length) === input.trim();
      });
      const sortedFilteredUsers = filteredUsers.sort((a, b) =>
        a.login > b.login ? 1 : b.login > a.login ? -1 : 0
      );
      if (input === "") {
        setFilteredData([]);
      } else {
        setFilteredData(sortedFilteredUsers);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, [input]);

  const getEnteredUser = (event) => {
    const enteredUser = event.target.value;
    setInput(enteredUser);
  };

  const clearInput = () => {
    setFilteredData([]);
    setInput("");
  };
  const filteredListUsers = useMemo(() => filteredData, [filteredData]);
  return (
    <Fragment>
      <div className={styles.typeahead}>
        <div className={styles.searchInputs}>
          <input
            type="text"
            placeholder="search a github user"
            className={styles.userInput}
            value={input}
            onChange={getEnteredUser}
            ref={inputRef}
          />
          <div className={styles.searchIcon}>
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon className={styles.clearBtn} onClick={clearInput} />
            )}
          </div>
        </div>
      </div>
      <UsersList users={filteredListUsers} />
    </Fragment>
  );
}

export default Typeahead;
