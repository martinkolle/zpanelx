<?php

/**
 * Generic template place holder class.
 * @package zpanelx
 * @subpackage dryden -> ui -> tpl
 * @version 1.0.0
 * @author Bobby Allen (ballen@zpanelcp.com)
 * @copyright ZPanel Project (http://www.zpanelcp.com/)
 * @link http://www.zpanelcp.com/
 * @license GPL (http://www.gnu.org/licenses/gpl.html)
 */
class ui_tpl_serveripaddress {

    public function Template() {
        if (!fs_director::CheckForEmptyValue(ctrl_options::GetSystemOption('server_ip'))) {
            return ctrl_options::GetSystemOption('server_ip');
        } else {
            return sys_monitoring::ServerIPAddress();
        }
    }

}

?>
