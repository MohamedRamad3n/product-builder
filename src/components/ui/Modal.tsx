import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface IProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ children, title, isOpen, close }: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-4"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-gray-600"
              >
                {title}
              </DialogTitle>
              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default Modal;
