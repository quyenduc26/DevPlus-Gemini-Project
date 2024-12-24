'use client';

import * as Toast from '@radix-ui/react-toast';

export default function ToastManager({
  message,
  isOpen,
  onClose,
}: {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={isOpen}
        onOpenChange={onClose}
        className="rounded-lg bg-gray-800 px-4 py-2 text-white shadow-md"
      >
        <Toast.Title className="font-bold">Notification</Toast.Title>
        <Toast.Description>{message}</Toast.Description>
        <Toast.Action
          altText="Close"
          className="absolute right-2 top-2 text-gray-400 hover:text-white"
          asChild
        >
          <button onClick={onClose}>Close</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-4 right-4 z-50 flex w-96 max-w-full flex-col gap-2" />
    </Toast.Provider>
  );
}
