import React from 'react';
import ImageContainer from "./ImageContainer.jsx";
import { Stack, Pagination, } from "react-bootstrap";
import { useImageContext } from "./ImageContext.jsx";
import ImageFilter from "./ImageFilter.jsx";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const SECTION_SIZE = 5;
function PageLink({ params, page, activePage, children }){
  params.set('page', page);
  if (page === 0) return React.cloneElement(children, { disabled: true });

  return (
    <LinkContainer
      isActive={() => page === activePage}
      to={{ search: `?${params.toString()}` }}
    >
      {children}
    </LinkContainer>
  );
}

const HomePage = ({ }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let page = parseInt(params.get("page"), 10);
  const { imageData, pages, setPage } = useImageContext();
  setPage(page);

  const feeds = imageData.map((image) => (
    <ImageContainer key={image.id} imageData={image} />
  ));
  
  if (Number.isNaN(page)) page = 1;
  const startPage = Math.floor((page - 1) / SECTION_SIZE) * SECTION_SIZE + 1;
  const endPage = startPage + SECTION_SIZE - 1;
  const prevSection = startPage === 1 ? 0 : startPage - SECTION_SIZE;
  const nextSection = endPage >= pages ? 0 : startPage + SECTION_SIZE;
  const items = [];
  for (let i = 1; i <= Math.min(endPage, pages); i = i + 1){
    params.set('page', i);
    items.push(
      <PageLink key={i} params={params} activePage={page} page={i}>
        <Pagination.Item>{i}</Pagination.Item>
      </PageLink>
    )
  };
  return (
    <Stack gap={3}>
      <ImageFilter/>
      {feeds}
      <Pagination>
        <PageLink params={params} page={prevSection}>
          <Pagination.Item>{'<'}</Pagination.Item>
        </PageLink>
        {items}
        <PageLink params={params} page={nextSection}>
          <Pagination.Item>{'>'}</Pagination.Item>
        </PageLink>
      </Pagination>
    </Stack>
  );
};

export default HomePage;
