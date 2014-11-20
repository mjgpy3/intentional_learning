(ns funky-spec.core-test
  (:require [clojure.test :refer :all]
            [funky-spec.core :refer :all]))

(describe 42
  (it = 42))

(describe 99
  (it not= 42))

(describe 0
  (it-is zero?))

(describe 99
  (it-is-the (complement zero?)))

(defn answer [] 42)

(describe answer
  (when-applied
    (it = 42)))

(describe identity
  (when-applied-to 99
    (it = 99)))
