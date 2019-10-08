import React from "react";
import { Input } from "semantic-ui-react";

const SearchBy = () => {
  return (
    <Input
      icon="search"
      iconPosition="left"
      className="search"
      placeholder="Search by description"
    />
  );
};

export default SearchBy;
