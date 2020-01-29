class AddTypeToPodcats < ActiveRecord::Migration[5.2]
  def change
    add_column :podcasts, :type, :string
  end
end
