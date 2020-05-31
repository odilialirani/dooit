class ReceiptBelongsToUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :receipts, :user, index: true
  end
end
