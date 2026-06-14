"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { Testimonials } from "@/utils/types/table";

import "swiper/css";
import "swiper/css/pagination";
import "./schoolTestimonials.css";

export default function SchoolTestimonials({ testimonials }: { testimonials: Testimonials[] }) {
  return (
    <section className="parents_testimonials">
      <SarmentsText format="title" color="blue" className="parents_testimonials_title">
        La parole aux parents
      </SarmentsText>

      <div className="parents_testimonials_wrapper">
        <RiDoubleQuotesL className="parents_testimonials_quote parents_testimonials_quote_left" />
        <RiDoubleQuotesR className="parents_testimonials_quote parents_testimonials_quote_right" />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={(testimonials.length ?? 0) > 1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="parents_testimonials_swiper"
        >
          {testimonials?.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="parents_testimonials_slide">
                <SarmentsText format="text" color="blue" className="parents_testimonials_content">
                  {t.content}
                </SarmentsText>
                <SarmentsText
                  format="semi-title-medium"
                  color="blue"
                  className="parents_testimonials_author"
                >
                  {t.author}
                  {t.school_level && <>, {t.school_level}</>}
                </SarmentsText>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
