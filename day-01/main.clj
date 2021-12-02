(require '[clojure.string :refer [split]])

(defn read-input
  [filename]
  (as-> (slurp filename) $
    (split $ #"\n")
    (map #(Integer/parseInt %) $)))

(def test-data (read-input "test-input.txt"))
(def input (read-input "input.txt"))

;; puzzle #1

(defn count-increased [data]
  (->> (partition 2 1 data)
       (map #(if (< (first %) (second %)) 1 0))
       (reduce +)))

(= 7 (count-increased test-data))
(def increased-measurements
  (count-increased input))

;; puzzle #2

(defn count-sum-increased [data]
  (->> (partition 3 1 data)
       (map #(reduce + %))
       (count-increased)))

(= 5 (count-sum-increased test-data))
(def increased-window-measurements
  (count-sum-increased input))

(println
 "increased measurements: \t"
 increased-measurements)
(println
 "increased window measurements: \t"
 increased-window-measurements)
