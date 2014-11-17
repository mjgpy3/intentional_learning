(ns funky-spec.core-test
  (:require [clojure.test :refer :all]
            [funky-spec.core :refer :all]))

(describe 42
  (it = 42))
