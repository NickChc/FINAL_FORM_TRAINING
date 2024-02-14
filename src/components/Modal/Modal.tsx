import { PropsWithChildren, useEffect } from "react";

interface ModalProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export function Modal({
  children,
  open,
  setOpen,
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [open]);

  if (!open) return;

  // WROK HERE
  return (
    <div
      className="absolute top-0 right-0 w-full h-dvh flex items-center justify-center backdrop-blur  "
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.target as HTMLElement)) {
          setOpen(false);
        }
      }}
    >
      <span className="flex items-center justify-center w-full overflow-y-scroll h-full">
        {children}
      </span>
    </div>
  );
}
