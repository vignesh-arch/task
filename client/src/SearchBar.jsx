import React from "react";
import AsyncSelect from 'react-select/async';
import { useImageContext } from "./ImageContext";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SERVER_ENDPOINT from "./config";

function SearchBar() {
  const [query, setQuery] = useState(null);
  const { imageData } = useImageContext();
  const navigate = useNavigate();

  async function loadOptions(term){
    if (term.length < 3) return [];
    
    const data = {
      query: term
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
    <AsyncSelect
      instanceId='search-select'
      value=''
      loadOptions={loadOptions}
      filterOption={() => true}
      onChange={onChangeSelection}
      components={{ DropdownIndicator: null }}
    />
  );
}

export default SearchBar;
