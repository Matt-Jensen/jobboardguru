import { ReactNode, FunctionComponent } from 'react'
import { Pagination, Lazy, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TESTIMONIALS } from './data';
import styles from './styles.module.scss';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

type Props = {}

const Testimonials: FunctionComponent = ({}: Props) => {
  return (
    <div className={styles.landingHeroTestimonial}>
      <Swiper
        className={styles.landingHeroTestimonial__swiper}
        modules={[Pagination, Lazy, Autoplay]}
        lazy={{ loadPrevNext: true }}
        autoplay={{ delay: 5000 }}
        preloadImages={false}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
      {TESTIMONIALS.map((testimonial, i) => (
        <SwiperSlide key={i} className={styles.landingHeroTestimonial__swiperSlide}>
          <header className={styles.landingHeroTestimonial__swiperSlide__rating}>
            <img
              data-src="/assets/components/landingHero/testimonials/trustpilot-review.png"
              data-srcset="/assets/components/landingHero/testimonials/trustpilot-review@2x.png"
              className="swiper-lazy" />
          </header>

          <div className={styles.landingHeroTestimonial__swiperSlide__quote}>
            <aside className={styles.landingHeroTestimonial__swiperSlide__quote__avatar}>
              <img
                data-src={`/assets/components/landingHero/testimonials/${testimonial.avatarSrc}`}
                data-srcset={`/assets/components/landingHero/testimonials/${testimonial.avatarSrc2x}`}
                className="swiper-lazy" />
              <div className="swiper-lazy-preloader"></div>
            </aside>

            <blockquote className={styles.landingHeroTestimonial__swiperSlide__quote__main}>
              <p>{testimonial.quote}</p>
              <footer>
                <cite>
                  <a href={testimonial.quoteUrl} target="_blank" className={styles.landingHeroTestimonial__swiperSlide__quote__authorName}>{testimonial.authorName}</a>
                  <span className={styles.landingHeroTestimonial__swiperSlide__quote__authorRole}>{testimonial.authorRole}</span>
                </cite>
              </footer>
            </blockquote>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
