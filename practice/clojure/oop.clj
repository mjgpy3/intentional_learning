(defn make-account [initial-balance]
  (let [bal (ref initial-balance)
        withdraw (fn [amount]
                   (dosync (alter bal #(- % amount))))
        deposit (fn [amount]
                  (dosync (alter bal (partial + amount))))
        amount (fn []
                 (deref bal))
        reset (fn []
                (dosync (ref-set bal initial-balance)))]
    (fn [meth & args]
      (cond
        (= meth :withdraw) (withdraw (first args))
        (= meth :deposit) (deposit (first args))
        (= meth :amount) (amount)
        (= meth :reset) (reset)))))

(def account (make-account 1000))
(println (account :amount))

(account :withdraw 75)
(println (account :amount))

(account :reset)
(println (account :amount))
