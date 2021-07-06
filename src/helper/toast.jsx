import Swal from 'sweetalert2';

/*
  ------------------
    Alert Message
 --------------------
 */
export const showSuccess = (message) => {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  toast.fire({
    type: 'success',
    title: message,
  });
};

export const confirmBox = async (obj) => {
  if (!obj) {
    obj = {};
  }
  let {
    title,
    text,
    type,

    confirmButtonText,
    confirmButtonColor,
    cancelButtonColor,
  } = obj;
  return await Swal.fire({
    title: title || 'Are you sure?',
    text: text || 'You want to be able to revert this!',
    type: type || 'warning',
    showCancelButton: true,
    confirmButtonText: confirmButtonText || `Yes`,
    confirmButtonColor: confirmButtonColor || '#3085d6',
    cancelButtonColor: cancelButtonColor || '#d33',
  });
};
