package hr.project.api.dto;

import java.util.List;

public class BulkDeleteIds {
    private List<Long> ids;

    public List<Long> getIds() {
        return this.ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }
    
}
