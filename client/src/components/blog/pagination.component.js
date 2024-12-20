import React from 'react'

const Pagination = ({ currentPage, pages }) => {
  function nextPage() {
    if (currentPage.page + 1 <= pages.length)
      currentPage.setPage(prev => prev + 1);
  }

  function prevPage() {
    if (currentPage.page - 1 >= 1)
      currentPage.setPage(prev => prev - 1);
  }

  // Hien tai chua xong vi chua co logic xu ly so trang can show ra.
  // Vi du: Trong 15 trang chi show ra 5 trang 1,2,3,4,5 || 2,3,4,5,6
  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
      <button style={{ background: '#14C38E' }} onClick={prevPage} >&lt;</button>
      {/* Lap qua mang gom cac trang muon the hien */}
      {pages.length && pages.map((page, index) => (<div key={index} onClick={() => currentPage.setPage(page)} style={{ color: currentPage.page === page ? "green" : "", fontWeight: '700', cursor: 'pointer' }}>{page}</div>))}
      <button style={{ background: '#14C38E' }} onClick={nextPage}>&gt;</button>
    </div >

  )
}

export default Pagination;
