class FriendBelongsToUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :friends, :user, index: true
  end
end
