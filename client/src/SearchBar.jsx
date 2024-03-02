import React from "react";
import AsyncSelect from 'react-select/async';
import { useNavigate, } from 'react-router-dom';
import SERVER_ENDPOINT from "./config";
import { Nav } from "react-bootstrap";

function SearchBar() {
  const navigate = useNavigate();

  async function loadOptions(term){
    if (term.length < 3) return [];
    
    const data = {
      search: term
    }
    const response = await fetch(`${SERVER_ENDPOINT}/getImages/${JSON.stringify(data)}`, {
      method: 'GET'
    });
    const result = await response.json();
    return result.images.map(image => ({
      label: `#${image.id} ${image.caption}`,
      value: image.id
    }));
  }

  function onChangeSelection({ value }){
    navigate(`/edit/${value}`);
  }

  return (
    <Nav.Item>
      <AsyncSelect
        instanceId='search-select'
        value=''
        loadOptions={loadOptions}
        filterOption={() => true}
        onChange={onChangeSelection}
        components={{ DropdownIndicator: null }}
        style = {{width:'400px'}}
      />
    </Nav.Item>
  );
}

export default SearchBar;
