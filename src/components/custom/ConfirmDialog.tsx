import { useState } from 'react';
import { Button } from '@/components/common/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';

type Props = {
  className?: string;
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
  triggerCpn: React.ReactNode;
  visibleBtn?: boolean;
  onOk: () => void;
};

export function ConfirmDialog(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>{props.triggerCpn}</DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${props.className}`}>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.content}</DialogDescription>
        </DialogHeader>
        {!props.visibleBtn && (
          <DialogFooter>
            <Button
              type='submit'
              onClick={() => {
                setOpen(false);
                props.onOk();
              }}
            >
              Đồng ý
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
