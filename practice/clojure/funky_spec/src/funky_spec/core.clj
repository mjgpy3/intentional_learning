(ns funky-spec.core)

(def described-entity (ref nil))

(defn it [fun & v]
  (assert (apply fun (cons (deref described-entity) v))))

(def it-is it)
(def it-is-the it)

(defmacro describe [value nest]
  `(dosync (ref-set described-entity ~value)
           ~nest))

(defmacro when-applied [nest]
  `(dosync (ref-set described-entity ((deref described-entity)))
           ~nest))
