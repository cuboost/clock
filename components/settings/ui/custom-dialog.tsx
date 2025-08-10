"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface CustomDialogProps {
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  closeText?: string;
}

export function CustomDialog({
  title,
  description,
  children,
  onConfirm,
  confirmText,
  closeText = "Close",
}: CustomDialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = !useIsMobile();

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{closeText}</Button>
            </DialogClose>
            {confirmText && (
              <Button onClick={handleConfirm}>{confirmText}</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{closeText}</Button>
          </DrawerClose>
          {confirmText && (
            <Button onClick={handleConfirm}>{confirmText}</Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
