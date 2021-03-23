import Swal from "sweetalert2"

export default function showSweetAlert(alertType, message) {
  switch(alertType) {
    case 'error':
      Swal.fire({
        icon: alertType,
        // title: 'Oops..',
        html: message,
        confirmButtonColor: '#ff886d',
      })
    case 'success':
      Swal.fire({
        icon: alertType,
        // title: 'Success',
        html: message,
        confirmButtonColor: '#ff886d',
      })
  }
}
