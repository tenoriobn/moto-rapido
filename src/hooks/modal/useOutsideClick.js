import { useEffect } from 'react';

function useOutsideClick(ref, openModal, setOpenModal) {

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenModal();
      }
    };

    if (openModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [openModal, setOpenModal, ref]);
}

export default useOutsideClick;
