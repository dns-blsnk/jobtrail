'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import type { PhotoShape } from '@/entities/resume/model/types';

interface PhotoCropDialogProps {
  open: boolean;
  src: string;
  shape: PhotoShape;
  onConfirm: (croppedUrl: string) => void;
  onCancel: () => void;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise<void>((resolve) => {
    image.onload = () => resolve();
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2d context unavailable');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL('image/jpeg', 0.92);
}

export function PhotoCropDialog({ open, src, shape, onConfirm, onCancel }: PhotoCropDialogProps) {
  const t = useTranslations('resumeBuilderPage.editBlock');
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  async function handleConfirm() {
    if (!croppedAreaPixels) return;
    const url = await getCroppedImg(src, croppedAreaPixels);
    onConfirm(url);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }

  function handleCancel() {
    onCancel();
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  }

  const aspect = shape === 'portrait' ? 80 / 112 : 1;
  const cropShape: 'round' | 'rect' = shape === 'circle' ? 'round' : 'rect';

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{t('cropPhoto')}</DialogTitle>
      <DialogContent>
        <Box sx={{ position: 'relative', width: '100%', height: 320, background: '#111' }}>
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </Box>
        <Box sx={{ mt: 2, px: 1 }}>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.05}
            onChange={(_, value) => setZoom(value as number)}
            aria-label="Zoom"
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="inherit">
          {t('cancel')}
        </Button>
        <Button onClick={() => void handleConfirm()} variant="contained">
          {t('apply')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
