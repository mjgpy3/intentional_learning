(ns funky-spec.core)

(def described-entity (ref nil))

(defn it [_ v]
  (assert (= (deref described-entity) v)))

(defmacro describe [value nest]
  `(dosync (ref-set described-entity ~value)
           ~nest))
