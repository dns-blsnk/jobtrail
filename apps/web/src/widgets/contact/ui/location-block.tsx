'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import s from './location-block.module.scss';

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d130117.5!2d24.6437!3d59.437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692949e9dc5cf49%3A0x4201b9c0ed2e770!2sTallinn%2C%20Estonia!5e0!3m2!1sen!2see!4v1700000000000!5m2!1sen!2see';

function TallinnClock({ label }: { label: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Tallinn',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className={s.timeRow}>
      <AccessTimeOutlinedIcon sx={{ fontSize: 15 }} />
      <span className={s.timeLabel}>{label}</span>
      <span className={s.timeValue}>{time}</span>
    </div>
  );
}

export function LocationBlock() {
  const t = useTranslations('contactPage.location');

  return (
    <section className={s.root}>
      <h2 className={s.heading}>{t('heading')}</h2>

      <div className={s.body}>
        <div className={s.mapWrapper}>
          <iframe
            allowFullScreen
            className={s.map}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={MAPS_EMBED_URL}
            title={t('mapsTitle')}
          />
        </div>

        <div className={s.meta}>
          <div className={s.cityRow}>
            <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
            <span className={s.city}>{t('city')}</span>
          </div>

          <TallinnClock label={t('localTimeLabel')} />

          <p className={s.status}>{t('status')}</p>
        </div>
      </div>
    </section>
  );
}
