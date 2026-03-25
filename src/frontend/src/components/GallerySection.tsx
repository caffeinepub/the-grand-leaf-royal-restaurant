import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";

const galleryItems = [
  {
    image:
      "/assets/uploads/images_-_2026-02-25t065549.466-019d22ce-ca16-756e-88f7-2a20f9a69c5d-1.jpeg",
    title: "Kolli Hills - I Love Kolli",
    titleTamil: "கோள்ளி மலை இயற்கை அழகு",
  },
  {
    image:
      "/assets/uploads/images_-_2026-02-25t061601.921-019d22ce-cb66-70da-878f-13f260b35139-2.jpeg",
    title: "Kolli Hills Deity Festival",
    titleTamil: "கோள்ளி மலை தெய்வ விழா",
  },
  {
    image:
      "/assets/uploads/article-1-1-1-019d22ce-cbf0-77ec-aae9-0e41534c5340-3.jpg",
    title: "70 Hairpin Bends Road",
    titleTamil: "70 வளைவு சாலை",
  },
  {
    image:
      "/assets/uploads/img_20260225_062043-019d22ce-cc6b-7541-9223-d44822eb6353-4.jpg",
    title: "Masi Periyasamy Temple",
    titleTamil: "மாசி பெரியசாமி திருக்கோயில்",
  },
  {
    image:
      "/assets/uploads/3471f550-a870-4e28-afae-5b173c928a5f-019d22ce-ce54-740a-90d2-1c9572f0e961-5.jpg",
    title: "Kolli Hills Waterfall",
    titleTamil: "கோள்ளி மலை அருவி",
  },
  {
    image:
      "/assets/uploads/img_20260225_001038-019d22ce-cf3e-752d-870c-450cd24f05ab-6.jpg",
    title: "Agaya Gangai Falls",
    titleTamil: "ஆகாய கங்கை அருவி",
  },
  {
    image:
      "/assets/uploads/img_20260227_221110_888-019d22ce-cf14-728d-ad79-907ede586ff0-7.webp",
    title: "I Love Kolli Hills - Bends",
    titleTamil: "கோள்ளி மலை வளைவு சாலை",
  },
  {
    image: "/assets/uploads/wlwg29-019d22ce-d264-7695-955c-90bc13adf78b-10.jpg",
    title: "Arapaleeswarar Temple",
    titleTamil: "அரபளீச்வரர் கோவில்",
  },
];

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + galleryItems.length) % galleryItems.length,
    );
  const next = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryItems.length));

  return (
    <section id="gallery" className="royal-section-light py-16 px-4">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-3xl md:text-4xl text-royal-green">
            Kolli Hills Gallery
          </h2>
          <p className="font-poppins text-muted-foreground mt-2 text-sm">
            கோள்ளி மலையின் அழகிய தலங்கள்
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative group cursor-pointer rounded-xl overflow-hidden"
              data-ocid={`gallery.item.${i + 1}`}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="block w-full h-full"
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
              <div className="absolute inset-0 pointer-events-none bg-royal-green/0 group-hover:bg-royal-green/60 transition-all duration-300 flex items-end">
                <div className="p-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="font-cinzel text-gold text-xs font-semibold">
                    {item.title}
                  </p>
                  <p className="font-poppins text-cream/80 text-xs">
                    {item.titleTamil}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-screen p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[lightboxIndex].image}
                alt={galleryItems[lightboxIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="text-center mt-4">
                <p className="font-cinzel text-gold font-semibold">
                  {galleryItems[lightboxIndex].title}
                </p>
                <p className="font-poppins text-cream/80 text-sm">
                  {galleryItems[lightboxIndex].titleTamil}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                data-ocid="gallery.close.button"
                className="absolute top-2 right-2 bg-gold text-royal-green p-2 rounded-full hover:bg-gold-light"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gold text-royal-green p-2 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-10 top-1/2 -translate-y-1/2 bg-gold text-royal-green p-2 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
