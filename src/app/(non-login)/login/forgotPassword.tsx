import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddButton } from '@/components/Button';
import { useTranslations } from "next-intl";
import { useAppDispatch } from '@/redux/hooks';
import { forgotPassword } from '@/redux/slices/auth/genericAuthThunk';
import { useMemo, useState } from 'react';

interface ForgotPasswordModal{
  handleShow: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ handleClose, handleShow }: ForgotPasswordModal){
  const t = useTranslations("forgotPassword");
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false); // para di agad mag red pag di pa nag iinteract

  const emailError = useMemo(() => {
    const v = email.trim();

    if (!v) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(v)) return "Invalid email format";

    return "";
  }, [email]);

  const isValid = !emailError;

  const payload = {
    email,
    context: {
      title: t('emailFormat.title'),
      hello: t('emailFormat.hello'),
      subtext: t('emailFormat.subtext'),
      subtext1: t('emailFormat.subtext1'),
      subtext2: t('emailFormat.subtext2'),
      regards: t('emailFormat.regards'),
      suppoert: t('emailFormat.support'),
      resetButton: t('emailFormat.resetButton')
    }
  };

  const handleSubmit = async () => {
    setTouched(true);
    if (!isValid) return;

    setIsLoading(true);

    try {
      await dispatch(forgotPassword(payload)).unwrap();
      setEmail("");
      setTouched(false);
      handleClose();
      console.log("Email sent successfully");
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-custom">{t("loading")}</div>
        </div>
      )}

      <Modal show={handleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.header')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row m-0">
            <div className="col">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!touched) setTouched(true); // realtime once user starts typing
                }}
                onBlur={() => setTouched(true)}
                className={`form-control rounded-5 ${(touched && emailError) ? "is-invalid" : ""}`}
                placeholder={t('modal.placeholder')}
              />

              {touched && emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modal.cancel')}
          </Button>

          <AddButton
            className='btn btn-primary-custom rounded-3'
            onClick={handleSubmit}
            label={t('modal.button')}
            icon={null}
            // Optional: if AddButton supports disabled
            disabled={!isValid || isLoading}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
