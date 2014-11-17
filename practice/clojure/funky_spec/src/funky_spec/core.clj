(ns funky-spec.core)

(def described-entity (ref nil))

(defn it [fun v]
  (assert (fun (deref described-entity) v)))

(defmacro describe [value nest]
  `(dosync (ref-set described-entity ~value)
           ~nest))
