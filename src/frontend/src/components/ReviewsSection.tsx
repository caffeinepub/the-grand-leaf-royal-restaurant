import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  foodItem: string;
  date: string;
}

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Priya Devi",
    rating: 5,
    comment:
      "The Nattu Kozhi Pepper Fry is absolutely divine! Tastes just like my grandmother's cooking. The flavors of Kolli Hills are perfectly captured.",
    foodItem: "Nattukolli Pepper Fry",
    date: "2024-03-10",
  },
  {
    id: "2",
    name: "Karthik Raj",
    rating: 5,
    comment:
      "Best biryani in Kolli Hills! The Royal Chicken Biryani is packed with flavor. Delivery was super fast too. Highly recommended!",
    foodItem: "Royal Chicken Biryani",
    date: "2024-03-08",
  },
  {
    id: "3",
    name: "Meera S",
    rating: 5,
    comment:
      "The veg meals here are a class apart. Fresh sambar, perfect poriyal, and the Kolli Hills pepper rasam is unique and delicious. True homemade quality!",
    foodItem: "Veg Meals",
    date: "2024-03-05",
  },
];

function StarRating({
  rating,
  onRate,
}: { rating: number; onRate?: (r: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => onRate?.(s)}
          className={onRate ? "cursor-pointer" : "cursor-default"}
          type="button"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              s <= rating
                ? "fill-gold text-gold"
                : "fill-none text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection({ showForm }: { showForm?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem("grandleaf_reviews");
      return saved ? JSON.parse(saved) : defaultReviews;
    } catch {
      return defaultReviews;
    }
  });
  const [showReviewForm, setShowReviewForm] = useState(showForm ?? false);
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: "",
    foodItem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now().toString(),
      ...form,
      date: new Date().toISOString().split("T")[0],
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("grandleaf_reviews", JSON.stringify(updated));
    setForm({ name: "", rating: 5, comment: "", foodItem: "" });
    setShowReviewForm(false);
  };

  return (
    <section id="reviews" className="royal-section-light py-16 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-3xl md:text-4xl text-royal-green">
            Customer Reviews
          </h2>
          <p className="font-poppins text-muted-foreground mt-2 text-sm">
            What our royal guests say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reviews.slice(0, 6).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xs"
              data-ocid={`reviews.item.${i + 1}`}
            >
              <StarRating rating={review.rating} />
              <p className="font-poppins text-sm text-foreground mt-3 mb-4 leading-relaxed">
                "{review.comment}"
              </p>
              <div className="border-t pt-3">
                <p className="font-cinzel text-sm text-royal-green font-semibold">
                  {review.name}
                </p>
                <p className="font-poppins text-xs text-muted-foreground">
                  {review.foodItem} • {review.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            data-ocid="reviews.open_modal_button"
            className="btn-gold"
          >
            Write a Review
          </button>
        </div>

        {showReviewForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            onSubmit={handleSubmit}
            className="mt-8 bg-white rounded-2xl p-8 shadow-xs max-w-lg mx-auto"
            data-ocid="reviews.dialog"
          >
            <h3 className="font-cinzel font-bold text-royal-green text-xl mb-6">
              Share Your Experience
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="review-name"
                  className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                >
                  Your Name
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  data-ocid="reviews.name.input"
                  required
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <p className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1">
                  Rating
                </p>
                <StarRating
                  rating={form.rating}
                  onRate={(r) => setForm((f) => ({ ...f, rating: r }))}
                />
              </div>
              <div>
                <label
                  htmlFor="review-food"
                  className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                >
                  Food Item
                </label>
                <input
                  id="review-food"
                  type="text"
                  value={form.foodItem}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, foodItem: e.target.value }))
                  }
                  data-ocid="reviews.food.input"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="review-comment"
                  className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                >
                  Your Review
                </label>
                <textarea
                  id="review-comment"
                  value={form.comment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, comment: e.target.value }))
                  }
                  data-ocid="reviews.comment.textarea"
                  required
                  rows={4}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  data-ocid="reviews.submit.button"
                  className="flex-1 btn-gold py-2"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  data-ocid="reviews.cancel.button"
                  className="flex-1 btn-ghost-gold py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
