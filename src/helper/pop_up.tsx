import Swal from "sweetalert2";

type PopupOptions = {
  title?: string;
  text?: string;
  icon?: 'warning' | 'success' | 'error' | 'info' | 'question';
  confirmText?: string;
  onConfirm?: () => void;
};

export const popup = ({
  title = 'Sigurado ka ba?',
  text,
//   html,
  icon,
  onConfirm,
}: PopupOptions) => {
    Swal.fire({
    title: `<strong>${title}</strong>`,
    html: `
        <div style="text-align:center">
        <p>${text}</p>
        </div>
    `,
    icon,
    showCancelButton: true,
    }).then((result) => {
    if (result.isConfirmed) {
      onConfirm?.();
    }
  });;
};
