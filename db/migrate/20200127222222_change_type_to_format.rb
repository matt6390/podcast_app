class ChangeTypeToFormat < ActiveRecord::Migration[5.2]
  def change
    rename_column :podcasts, :type, :format
  end
end
