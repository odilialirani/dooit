module Budget
  class Budget < ApplicationRecord
    self.table_name = 'budgets'

    validates :category_id, presence: true
    validates :user_id, presence: true
    validates :amount, presence: true
    validates :start_date, presence: true
    validates :end_date, presence: true

    validate :end_date_in_the_past?
    validate :no_other_active_budget

    has_many :spendings, class_name: 'Budget::Spending', foreign_key: 'budget_id'

    belongs_to :category, class_name: 'Budget::Category', foreign_key: 'category_id'
    belongs_to :user, class_name: 'User', foreign_key: 'user_id'

    scope :active, -> { where(active: true) }

    # Validations
    def no_other_active_budget
      errors.add(:category_id, 'Category has an active budget during that timeframe.') unless user.budgets.select do |b| 
          active && b.active? && 
          ((b.start_date..b.end_date).cover?(start_date) || (b.start_date..b.end_date).cover?(end_date))
        end.first.nil?
    end

    def end_date_in_the_past?
      errors.add(:end_date, 'End date cannot be in the past') if end_date < Date.current
    end

    # Helpers
    def amount_spent
      spendings.sum(:amount)
    end

    # TODO: we need a hook to deactivate/activate budgets
  end
end